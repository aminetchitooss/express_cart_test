FROM node:12

WORKDIR /app

COPY package*.json ./ 

RUN npm i

COPY . .

ENV PORT=3000 MONGO_URI=mongodb+srv://<username>:<password>@nodeexpress.2thfl.mongodb.net/STORE-MANAGER-DB?retryWrites=true&w=majority

EXPOSE 3000

CMD ["npm","start"]
