import logo from '../assets/img/logo.png';

export const Saludo = ( text = 'Webpack app' ) =>{
    const template = `
    <div class="content">
        <div class="content-img">
            <img src="${logo}" alt="logo">
        </div>
        <div class="content-title">
            ${text}
        </div>
    </div>
    `
    document.body.innerHTML = template;
}
