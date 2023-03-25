document.getElementById('contactForm').addEventListener('submit', async (event) => {
    event.preventDefault();
  
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phoneNumber = document.getElementById('phone_number').value;
    const msgSubject = document.getElementById('msg_subject').value;
    const message = document.getElementById('message').value;
  
    const emailBody = `We have just received a new form submission on our website. Please find the details below:\n\nName: ${name}\nEmail: ${email}\nPhone Number: ${phoneNumber}\nSubject: ${msgSubject}\nMessage: ${message}\n\nPlease review the submission and take the necessary actions. If you have any questions or need further information, feel free to contact the submitter directly via the provided contact details.\n\nBest Regards,\n[Your Name]\n[Your Title]\n[Your Company]`;
  
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `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`, // Replace with your SendGrid API key
      },
      body: JSON.stringify({
        personalizations: [{
          to: [{ email: 'lzyacht@gmail.com' }], // Replace with your recipient email address
        }],
        from: { email: 'info@nelsonscilabs.com' }, // Replace with your "from" email address
        subject: 'New Form Submission Received',
        content: [{
          type: 'text/plain',
          value: emailBody,
        }],
      }),
    };
  
    try {
      const response = await fetch('https://api.sendgrid.com/v3/mail/send', requestOptions);
      if (!response.ok) {
        throw new Error(`SendGrid API returned status: ${response.status}`);
      }
      document.getElementById('msgSubmit').textContent = 'Email sent successfully';
      document.getElementById('msgSubmit').classList.remove('hidden');
    } catch (error) {
      console.error(error);
      document.getElementById('msgSubmit').textContent = 'Error sending email';
      document.getElementById('msgSubmit').classList.remove('hidden');
    }
  });
  