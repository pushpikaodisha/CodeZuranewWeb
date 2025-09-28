<?php
/**
 * Contact Form Handler
 * 
 * This script processes contact form submissions and sends emails.
 * Make sure to configure the email settings below for your hosting environment.
 */

// Enable error reporting for debugging (remove in production)
// error_reporting(E_ALL);
// ini_set('display_errors', 1);

// CORS headers for AJAX requests
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json; charset=utf-8');

// Configuration
$config = [
    'to_email' => 'hello@codezura.com',  // Change this to your email
    'from_email' => 'noreply@codezura.com', // Change this to your domain
    'from_name' => 'CodeZura Contact Form',
    'subject_prefix' => '[CodeZura] ',
    'enable_auto_reply' => true,
    'max_message_length' => 5000,
    'allowed_domains' => [], // Empty array allows all domains
    'honeypot_field' => 'website' // Hidden field to catch spam bots
];

/**
 * Sanitize input data
 */
function sanitizeInput($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data, ENT_QUOTES, 'UTF-8');
    return $data;
}

/**
 * Validate email address
 */
function isValidEmail($email) {
    return filter_var($email, FILTER_VALIDATE_EMAIL) !== false;
}

/**
 * Check if domain is allowed
 */
function isDomainAllowed($email, $allowedDomains) {
    if (empty($allowedDomains)) {
        return true; // Allow all domains if none specified
    }
    
    $domain = substr(strrchr($email, "@"), 1);
    return in_array(strtolower($domain), array_map('strtolower', $allowedDomains));
}

/**
 * Send email using PHP mail function
 */
function sendEmail($to, $subject, $message, $headers) {
    // For better email delivery, consider using PHPMailer or similar library
    return mail($to, $subject, $message, $headers);
}

/**
 * Generate auto-reply message
 */
function getAutoReplyMessage($name) {
    return "
    <html>
    <body style='font-family: Arial, sans-serif; line-height: 1.6; color: #333;'>
        <div style='max-width: 600px; margin: 0 auto; padding: 20px;'>
            <h2 style='color: #6366f1;'>Thank you for contacting CodeZura!</h2>
            
            <p>Hi " . htmlspecialchars($name) . ",</p>
            
            <p>Thank you for reaching out to us. We have received your message and will get back to you within 24 hours.</p>
            
            <p>In the meantime, feel free to:</p>
            <ul>
                <li><a href='https://codezura.com/portfolio.html' style='color: #6366f1;'>Browse our portfolio</a></li>
                <li><a href='https://codezura.com/services.html' style='color: #6366f1;'>Learn about our services</a></li>
                <li><a href='https://codezura.com/blog.html' style='color: #6366f1;'>Read our latest blog posts</a></li>
            </ul>
            
            <p>Best regards,<br>
            <strong>The CodeZura Team</strong></p>
            
            <hr style='margin: 30px 0; border: none; border-top: 1px solid #eee;'>
            <p style='font-size: 12px; color: #666;'>
                This is an automated message. Please do not reply to this email.
            </p>
        </div>
    </body>
    </html>
    ";
}

/**
 * Main processing function
 */
function processContactForm() {
    global $config;
    
    try {
        // Check if request is POST
        if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
            throw new Exception('Only POST requests are allowed.');
        }
        
        // Get form data
        $name = isset($_POST['name']) ? sanitizeInput($_POST['name']) : '';
        $email = isset($_POST['email']) ? sanitizeInput($_POST['email']) : '';
        $subject = isset($_POST['subject']) ? sanitizeInput($_POST['subject']) : '';
        $message = isset($_POST['message']) ? sanitizeInput($_POST['message']) : '';
        $honeypot = isset($_POST[$config['honeypot_field']]) ? $_POST[$config['honeypot_field']] : '';
        
        // Honeypot check (if filled, it's likely spam)
        if (!empty($honeypot)) {
            throw new Exception('Spam detected.');
        }
        
        // Validate required fields
        if (empty($name)) {
            throw new Exception('Name is required.');
        }
        
        if (empty($email)) {
            throw new Exception('Email is required.');
        }
        
        if (empty($message)) {
            throw new Exception('Message is required.');
        }
        
        // Validate email format
        if (!isValidEmail($email)) {
            throw new Exception('Invalid email address.');
        }
        
        // Check domain restrictions
        if (!isDomainAllowed($email, $config['allowed_domains'])) {
            throw new Exception('Email domain not allowed.');
        }
        
        // Check message length
        if (strlen($message) > $config['max_message_length']) {
            throw new Exception('Message is too long. Maximum ' . $config['max_message_length'] . ' characters allowed.');
        }
        
        // Prepare email content
        $emailSubject = $config['subject_prefix'] . (!empty($subject) ? $subject : 'New Contact Form Message');
        
        $emailMessage = "
        <html>
        <body style='font-family: Arial, sans-serif; line-height: 1.6; color: #333;'>
            <div style='max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;'>
                <h2 style='color: #6366f1; margin-bottom: 20px;'>New Contact Form Message</h2>
                
                <table style='width: 100%; border-collapse: collapse;'>
                    <tr>
                        <td style='padding: 10px; background-color: #f8f9fa; font-weight: bold; border: 1px solid #dee2e6;'>Name:</td>
                        <td style='padding: 10px; border: 1px solid #dee2e6;'>" . htmlspecialchars($name) . "</td>
                    </tr>
                    <tr>
                        <td style='padding: 10px; background-color: #f8f9fa; font-weight: bold; border: 1px solid #dee2e6;'>Email:</td>
                        <td style='padding: 10px; border: 1px solid #dee2e6;'>" . htmlspecialchars($email) . "</td>
                    </tr>";
        
        if (!empty($subject)) {
            $emailMessage .= "
                    <tr>
                        <td style='padding: 10px; background-color: #f8f9fa; font-weight: bold; border: 1px solid #dee2e6;'>Subject:</td>
                        <td style='padding: 10px; border: 1px solid #dee2e6;'>" . htmlspecialchars($subject) . "</td>
                    </tr>";
        }
        
        $emailMessage .= "
                    <tr>
                        <td style='padding: 10px; background-color: #f8f9fa; font-weight: bold; border: 1px solid #dee2e6;'>Date:</td>
                        <td style='padding: 10px; border: 1px solid #dee2e6;'>" . date('Y-m-d H:i:s') . "</td>
                    </tr>
                </table>
                
                <h3 style='color: #495057; margin: 20px 0 10px 0;'>Message:</h3>
                <div style='background-color: #f8f9fa; padding: 15px; border-radius: 5px; border-left: 4px solid #6366f1;'>
                    " . nl2br(htmlspecialchars($message)) . "
                </div>
                
                <hr style='margin: 30px 0; border: none; border-top: 1px solid #eee;'>
                <p style='font-size: 12px; color: #666;'>
                    This message was sent from the CodeZura contact form.
                </p>
            </div>
        </body>
        </html>
        ";
        
        // Email headers
        $headers = "MIME-Version: 1.0" . "\r\n";
        $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
        $headers .= "From: " . $config['from_name'] . " <" . $config['from_email'] . ">" . "\r\n";
        $headers .= "Reply-To: " . $email . "\r\n";
        $headers .= "X-Mailer: PHP/" . phpversion();
        
        // Send main email
        $mailSent = sendEmail($config['to_email'], $emailSubject, $emailMessage, $headers);
        
        if (!$mailSent) {
            throw new Exception('Failed to send email. Please try again later.');
        }
        
        // Send auto-reply if enabled
        if ($config['enable_auto_reply']) {
            $autoReplyHeaders = "MIME-Version: 1.0" . "\r\n";
            $autoReplyHeaders .= "Content-type:text/html;charset=UTF-8" . "\r\n";
            $autoReplyHeaders .= "From: " . $config['from_name'] . " <" . $config['from_email'] . ">" . "\r\n";
            
            sendEmail(
                $email, 
                'Thank you for contacting CodeZura', 
                getAutoReplyMessage($name), 
                $autoReplyHeaders
            );
        }
        
        // Success response
        return [
            'success' => true,
            'message' => 'Thank you for your message! We will get back to you soon.'
        ];
        
    } catch (Exception $e) {
        // Error response
        return [
            'success' => false,
            'message' => $e->getMessage()
        ];
    }
}

// Process the form and return JSON response
$response = processContactForm();
echo json_encode($response);
exit;
?>