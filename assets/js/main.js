const form = document.getElementById('contact-form');

emailjs.init('s6JUiYwyF8hmJ164z');

function sendEmail(templateParams) {
    emailjs.send('service_ymvjibk', 'template_x8o1apo', templateParams)
    .then(function(response) {
        alert("Formulário enviado com sucesso!");

        form.reset();
    })
    .catch(function(error) {
        alert("Erro ao enviar o formulário: " + JSON.stringify(error));
    });
}

function validateForm(event) {
    event.preventDefault();

    const name = document.getElementById('nome').value;
    const lastName = document.getElementById('sobrenome').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('telefone').value;
    const message = document.getElementById('mensagem').value;

    // Limpa mensagens anteriores
    document.getElementById('nome').setCustomValidity('');
    document.getElementById('sobrenome').setCustomValidity('');
    document.getElementById('email').setCustomValidity('');
    document.getElementById('telefone').setCustomValidity('');
    document.getElementById('mensagem').setCustomValidity('');

    // Validação de campos obrigatórios e mensagens personalizadas
    if (!name) document.getElementById('nome').setCustomValidity('Por favor, preencha seu nome.');
    if (!lastName) document.getElementById('nome').setCustomValidity('Por favor, preencha seu sobrenome.');
    if (!email) document.getElementById('email').setCustomValidity('Por favor, preencha seu e-mail.');
    if (!phone) document.getElementById('telefone').setCustomValidity('Por favor, preencha seu telefone.');
    if (!message) document.getElementById('mensagem').setCustomValidity('Por favor, preencha a mensagem.');

    // Validação de formato de email
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (email && !emailPattern.test(email)) {
        document.getElementById('email').setCustomValidity('Por favor, insira um e-mail válido.');
    }

    // Validação de telefone (apenas números)
    const phonePattern = /^[0-9]{10,11}$/;
    if (phone && !phonePattern.test(phone)) {
        document.getElementById('telefone').setCustomValidity('Por favor, insira um telefone válido.');
    }

  // Verifica se o formulário é válido
  if (form.checkValidity()) {

  // Extrair o primeiro nome
  const firstName = name.split(" ")[0];

    // Enviar os dados do formulário via EmailJS
    const templateParams = {
      name: name,
      email: email,
      phone: phone,
      message: message,
      from_name: firstName
    };
    sendEmail(templateParams); // Envia apenas se a validação estiver OK
  } else {
    form.reportValidity(); // Exibe as mensagens de erro personalizadas
  }
}

// Adiciona o evento de submissão ao formulário
form.addEventListener('submit', validateForm);

const imageAPILink = 'https://randomuser.me/api/?gender=male'

async function pegarImagens() {
    try {
        const responses = await Promise.all([
            fetch(imageAPILink).then(response => response.json()),
            fetch(imageAPILink).then(response => response.json()),
            fetch(imageAPILink).then(response => response.json())
        ]);

        const imagens = responses.map(data => data.results[0].picture.large);

        const imageDivs = document.querySelectorAll('.image-div');

        imagens.forEach((url, index) => {
            if (imageDivs[index]) { 
                const img = document.createElement('img');
                img.src = url;
                img.alt = "Foto de cliente";
                img.className = "w-full rounded-t-md"
                imageDivs[index].appendChild(img);
            }
        });
    } catch (error) {
        console.error('Erro ao buscar os dados:', error);
    }
}

pegarImagens();