```graphql
/src
  /modules
    /auth
      auth.controller.ts
      auth.service.ts
      auth.model.ts
      auth.routes.ts
    /sales
      sales.controller.ts
      sales.service.ts
      sales.model.ts
      sales.routes.ts
    /inventory
      inventory.controller.ts
      inventory.service.ts
      inventory.model.ts
      inventory.routes.ts
    /customer
      customer.controller.ts
      customer.service.ts
      customer.model.ts
      customer.routes.ts
    /analytics
      analytics.controller.ts
      analytics.service.ts
      analytics.routes.ts
  /common
    /middleware
      auth.middleware.ts
      error.middleware.ts
    /utils
    /config
  app.ts
  server.ts

```



- Authentication Module:

Why? It’s the backbone for role-based access, ensuring that all subsequent modules are secured from the start. Once user roles and secure endpoints are in place, you can integrate these security measures into each module.
- Sales Management Module:

Why? Sales transactions are often the core operation in retail ERP systems. Building this early allows you to validate key business processes, such as transaction handling and reporting, which may drive interactions with other modules like Inventory and POS.
- Inventory Management Module:

Why? Inventory directly affects sales. Once sales are functional, managing stock levels and triggering low-stock alerts become essential for business operations.
- Customer Management Module:

Why? Tracking customer details and purchase history is crucial for personalized service and loyalty programs. This module often ties into sales data for generating customer insights.
- Analytics and Reporting Module (including POS):

Why? With the core data in place from sales, inventory, and customer modules, you can generate visual reports and add POS functionality. Analytics can enhance decision-making and operational insights, and integrating a simple POS interface ties everything together.





docker build -t <name of the image>


docker --name -p run container_name host_port:container_port
image_name
# Example
docker --name -p run my_container 8080:80 myapp




promotions should be done by super admins 

everyone can regiter as normal cashier/user

