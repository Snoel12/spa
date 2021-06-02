import axios from "axios";
const userList = document.querySelector("#user-list");
const carList = document.querySelector("#car-list");
const saleList = document.querySelector("#sale-list");

const renderUsers = (users) => {
  const html = users
    .map(
      (user) => `<li> 
    <a href=#${user.id}'> ${user.name} </a>
    </li>`
    )
    .join("");
  userList.innerHTML = html;
};

const renderCars = (cars) => {
  const html = cars
    .map(
      (car) => `<li> 
       ${car.name} 
      </li>`
    )
    .join("");
  carList.innerHTML = html;
};

const renderSales = (sales) => {
  const html = sales
    .map(
      (sale) => `<li> 
         ${sale.car.name} 
        </li>`
    )
    .join("");
  saleList.innerHTML = html;
};

const powerOn = async () => {
  try {
    const users = (await axios.get("api/users")).data;

    const cars = (await axios.get("api/cars")).data;
    renderUsers(users);
    renderCars(cars);
  } catch (ex) {
    console.log(ex);
  }
};

window.addEventListener("hashchange", async () => {
  const userId = window.location.hash.slice(1);
  const url = `/api/users/${userId}/sales`;
  const sales = (await axios.get(url)).data;
  renderSales(sales);
});

powerOn();
