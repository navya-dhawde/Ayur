




https://github.com/Shrey-12/Ayu/assets/98189346/e3bd04f0-66dd-462b-9367-5073d5e6504b


How to run this project ?
```
npm run start
```

How to push on github
```
git add .
git commit -m "<message>"
git push origin <branch-name>
```

How to sync your branch
```
git pull origin main
```

Create pull requests to merge on main, kindly dont directly push on main.

username passwords for login
```
pari@gmail.com
pari@123
```

login into the admin panel
```
Admin@gmail.com
admin@123
```

make sure you are running json server in backend for dummy data 
```
json-server --watch data.json --port 8080
```

run stripe payment server
```
node .\stripe_pay.js
```
incase of errors change files CheckoutForm.js =>
 ```
return_url: `http://localhost:3000/orderSuccess/${currentOrder.id}`,
```
python version: 3.10.12
tensorflow version: 2.15.0

