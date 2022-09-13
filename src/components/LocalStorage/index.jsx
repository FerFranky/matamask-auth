const LocalStorage = ({ sign }) => {
    console.log('Vamo a almacenar la firma');
  try {
    if (localStorage.getItem("sign")) {
      if (localStorage.getItem("sign") != sign) {
        localStorage.setItem("sign", sign);
      }
      localStorage.getItem("sign");
      console.log('existe');
    }
    console.log('mostrar');

    localStorage.setItem("sign", sign);
    
    console.log(sign);
  } catch (error) {
    console.log(error);
  }
};
export default LocalStorage;
