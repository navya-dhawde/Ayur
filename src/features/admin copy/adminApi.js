// A mock function to mimic making an async request for data
export function createOrder(order) {
  return new Promise(async (resolve) =>{
    const response = await fetch('http://localhost:8080/orders',{
      method :"POST",
      body: JSON.stringify(order),
      headers:{
        "Content-Type":"application/json"
      }

    })
    const data = await response.json();
    resolve({data})
  }
    
  );
}
