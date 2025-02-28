FROM node:23

WORKDIR /srv

ENV PATH /srv/node_modules/.bin:$PATH

RUN apt-get update
RUN apt-get install nginx -y
COPY nginx.conf /etc/nginx/sites-available/default
RUN echo "\ndaemon off;" >> /etc/nginx/nginx.conf

COPY package*.json ./

RUN npm install

COPY . .
RUN npm run build
RUN cp -R dist/* /var/www/html/

RUN ln -sf /dev/stdout /var/log/nginx/access.log \
	&& ln -sf /dev/stderr /var/log/nginx/error.log

EXPOSE 80
CMD ["nginx"]
