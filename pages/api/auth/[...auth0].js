import { handleAuth, handleLogin } from "@auth0/nextjs-auth0";

export default handleAuth({
    async login(req, res) {
        const locale = req.cookies['NEXT_LOCALE'];
        try {
            await handleLogin(req, res, {
                authorizationParams: {
                    language: locale,
                },
            });
        } catch (error) {
            res.status(error.status || 400).end(error.message);
        }
    },
});
