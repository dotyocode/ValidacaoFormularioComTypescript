//importando o validator com a lib isEmail
import isEmail from 'validator/lib/isEmail';

//variavel que está recendo a classe show-error-message direto do style css
const show_error_messages = 'show-error-message';

// Selecionando os campos classe ou id do formulario
const form = document.querySelector('.form') as HTMLFormElement;
const usuario = document.querySelector('.usuario') as HTMLInputElement;
const email = document.querySelector('.email') as HTMLInputElement;
const senha = document.querySelector('.senha') as HTMLInputElement;
const senha2 = document.querySelector('.senha2') as HTMLInputElement;

//capturando o evento de submit do botao
form.addEventListener('submit', function (event: Event) {
  //codigo para não atualizar a pagina
  event.preventDefault();
  const existe = document.getElementById('alerta') as HTMLDivElement;
  if (existe) {
    const divdoBotao = document.getElementById('divdoBotao') as HTMLDivElement;
    divdoBotao.removeChild(existe);
  }
  //funcão para que se exigir uma msg exibida ocutar
  //o this, seria o form
  hidErrorMessages(this);

  //VALIDACAO
  //checando se tem algum campo vazio
  checkEmptyFields(usuario, email, senha, senha2);
  //checando se o email está vazio
  checkEmail(email);
  //checando as senhas se estão iguais
  checkPasswords(senha, senha2);

  //checando a ultima logica de verificacao
  //this novamente é o formulario form
  if (shouldSendForm(this)) {
    const divdoBotao = document.getElementById('divdoBotao') as HTMLDivElement;
    const alerta = document.createElement('div') as HTMLDivElement;
    alerta.innerHTML = 'Formulario enviado com sucesso!';
    alerta.id = 'alerta';
    alerta.classList.add('alert', 'alert-success', 'success-alert-size');
    divdoBotao.appendChild(alerta);
  } else {
    const divdoBotao = document.getElementById('divdoBotao') as HTMLDivElement;
    const alerta = document.createElement('div') as HTMLDivElement;
    alerta.innerHTML = 'Campos precisam ser preenchidos, verifique os campos';
    alerta.id = 'alerta';
    alerta.classList.add('alert', 'alert-danger', 'danger-alert-size');
    divdoBotao.appendChild(alerta);
  }
});

//VALIDAÇÃO! --- CHECANDO SE O INPUT NÃO ESTÁ VAZIO
function checkEmptyFields(...inputs: HTMLInputElement[]): void {
  inputs.forEach((input) => {
    if (!input.value)
      showErrorMessage(input, 'Este campo não pode ficar vazio');
  });
}

//VALIDAÇÃO! --- CHECANDO SE O Email é Valido
function checkEmail(input: HTMLInputElement): void {
  if (!isEmail(input.value)) showErrorMessage(input, 'Email invalido!');
}

//VALIDAÇÃO! --- CHECANDO AS senhas

function checkPasswords(
  password1: HTMLInputElement,
  password2: HTMLInputElement,
) {
  if (password1.value !== password2.value) {
    showErrorMessage(password1, 'Senhas não batem');
    showErrorMessage(password2, 'Senhas não batem');
  }
}

//funcao para exibir as msg de error
// funcão vai receber um input NAO ESQUECER DE COLOCAR O HTMLINPUTELEMENT
function showErrorMessage(input: HTMLInputElement, msg: string): void {
  //criando a funcao para receber a classe formFields
  const formFields = input.parentElement as HTMLDivElement;
  //sabendo qual é o campo de error
  const errorMessage = formFields.querySelector(
    '.error-message',
  ) as HTMLSpanElement;
  //exibindo as msg
  errorMessage.innerText = msg;
  formFields.classList.add(show_error_messages);
}

//OCUTANDO AS MSG DE ERROR
function hidErrorMessages(form: HTMLFormElement): void {
  //selecionando todos elementos
  form
    .querySelectorAll('.' + show_error_messages)
    .forEach((item) => item.classList.remove(show_error_messages));
}

//fazendo checagem para verificar se os campos não estão incorretos, e se estiverem todos corretos vai enviar
function shouldSendForm(form: HTMLFormElement): boolean {
  let send = true;
  form
    .querySelectorAll('.' + show_error_messages)
    .forEach(() => (send = false));
  return send;
}
