Step1 : make an .env file in the project root
=> A .env (environment variables) file in React is used to store sensitive data like API keys, backend URLs, or other configuration settings without exposing them in the code.
=> to access it, in VITE use VITE_var_name
    console.log(import.meta.env.VITE_var_name)
=> Must restart the server after changes
=> Don't commit .env to Git

Now make c config file and put this all environment variables and give them string type so that we dont get any error further in production and export them

What is useParams in React Router?
useParams is a React Router Hook that lets you extract URL parameters inside a component.

useMemo can be used to memoize the result of a function call, *while*
useCallback can be used to memoize the reference to a function.