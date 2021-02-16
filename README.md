# Global Brand Corporate FE client

* BE is fed via CMS API
* FE runs via Node, controlled via PM2 for stability and startup control


## Running on server
1. If files not already on server: `git clone https://github.com/fightwithcrayon/Global-Brands-Corporate/`
2. `cd Global-Brands-Corporate`
2. `npm install`
3. `npm build`
4. Install PM2 `npm install pm2@latest -g`
5. Launch as PM2 app `pm2 start npm --name "frontend" -- start`
6. Ensure PM2 will resume on restart: `pm2 startup` and then `pm2 save`

