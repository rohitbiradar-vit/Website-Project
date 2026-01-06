
    function editProfile() {
        let inputs = document.querySelectorAll("input, select");
        inputs.forEach(input => input.disabled = false);

        document.getElementById("editBtn").style.display = "none";
        document.getElementById("saveBtn").style.display = "inline-block";
    }

    function saveProfile() {
        let aadhaar = document.getElementById("aadhaar").value.trim();
        let pan = document.getElementById("pan").value.trim().toUpperCase();
        let email = document.getElementById("email").value.trim();
        let bank = document.getElementById("bank").value.trim();
        let contact = document.getElementById("contact").value.trim();

        document.getElementById("aadhaarError").textContent = "";
        document.getElementById("panError").textContent = "";
        document.getElementById("emailError").textContent = "";
        document.getElementById("bankError").textContent = "";
        document.getElementById("contactError").textContent = "";

        let valid = true;

        if(!/^\d{12}$/.test(aadhaar)){
            document.getElementById("aadhaarError").textContent = "Invalid Aadhaar! Must be 12 digits.";
            valid = false;
        }
        if(!/^[A-Z]{5}[0-9]{4}[A-Z]$/.test(pan)){
            document.getElementById("panError").textContent = "Invalid PAN! Format: ABCDE1234F";
            valid = false;
        }
        if(!/^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/.test(email)){
            document.getElementById("emailError").textContent = "Invalid Email address!";
            valid = false;
        }
        if(!/^\d{9,18}$/.test(bank)){
            document.getElementById("bankError").textContent = "Invalid Bank Account! 9-18 digits required.";
            valid = false;
        }
        if(!/^(\+91[-\s]?)?[6-9]\d{9}$/.test(contact)){
            document.getElementById("contactError").textContent = "Invalid Contact! 10 digits required.";
            valid = false;
        }

        if(!valid) return;

        let inputs = document.querySelectorAll("input, select");
        inputs.forEach(input => input.disabled = true);

        document.getElementById("editBtn").style.display = "inline-block";
        document.getElementById("saveBtn").style.display = "none";

        alert("Profile updated successfully!");

    }
    $(document).ready(function(){
      $("#saveBtn").click(function(){
        window.location.href = "index.html";
      });
    });

    function previewImage(event, previewId) {
        const reader = new FileReader();
        reader.onload = function(){
            document.getElementById(previewId).src = reader.result;
        };
        reader.readAsDataURL(event.target.files[0]);
    }

