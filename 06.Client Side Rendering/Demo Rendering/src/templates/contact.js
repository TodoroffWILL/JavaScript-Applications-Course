import { html } from '../../../../node_modules/lit-html/lit-html.js';

const contactTemplate = (contact) => html`
 <div
  class="card"
  style="width: 18rem; padding:0.8rem;"
>
  <img
    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhqI4txTRkj4_pCfr3NlNdbCbLYgX-nqjMX8wHEfx_A6Q8luaudlecd84nMDGZ1a4nwA0&usqp=CAU"
    class="card-img-top"
    alt="Contact"
  />
  <div class="card-body">
    <h5 class="card-title">${contact.person}</h5>
    <p class="card-text">${contact.phone}</p>
    <a href="#" class="btn btn-primary">Go somewhere</a>
  </div>
</div>`;

export default contactTemplate;
