# backend_nuitinfo  
- Package by layer due to the small size of project
- Separate the config (cors, database, ...) instead of injecting it directly to app  
- Use environment variable to hold the config var.
- Use strategy pattern to properly handle multiple types of errors
