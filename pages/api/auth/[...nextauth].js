import NextAuth  from "next-auth";

import CredentialsProvider from "next-auth/providers/credentials"

import User from "../../../models/user";
import dbConnect from "../../../utils/dbConnect";

export default NextAuth({
    session: {
        jwt: true
    },
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                username: {label: "Email", type: "email"},
                password: {label: "Password", type: "password"}
            },
            authorize: async (credentials) => {
                dbConnect()

                console.log(credentials)
                const user = await User.findOne({email: credentials.username}).select('+password')

                if(!user) { throw new Error('No user with a matching email was found.')}

                console.log(credentials.password)
                const pwValid = await user.comparePassword(credentials.password)

                if(!pwValid){ throw new Error("Your password is invalid") }

                return user

            }

            
        })
    ],
    callbacks: {
        // called when token is created
        async jwt({token, user}){
            if (user) {
                token.user = {
                    name: user.name,
                    email: user.email,
                    role: user.role,
                }
            }
            return token
        },

        session: async({session, token}) => {
            if(token){
                session.user = token.user
            }
            return session
        }
    },
    pages: {
        signIn: '/account/login',
    },
    secret: "test",
    jwt: {
        secret: "test",
        encryption: true
    }
})