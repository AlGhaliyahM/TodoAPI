FROM node:16

WORKDIR /the/workdir/path


COPY package*.json ./

RUN npm install

COPY . .

ENV PORT=3000

EXPOSE 3000


#EXC FORM 
CMD ["npm", "start"]  

