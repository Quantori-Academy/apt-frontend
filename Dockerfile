FROM node:20 as build
WORKDIR /apt-frontend
COPY package*.json .
RUN npm ci

COPY . .
RUN npm run build

FROM nginx:alpine
# COPY ./.nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /apt-frontend/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
