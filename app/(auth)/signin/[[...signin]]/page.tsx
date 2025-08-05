"use client"
import React, { useEffect, useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

const formSchema = z.object({
  email: z.string().email({
    message: "Invalid email address",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters long",
  }),
});

const CheckAuth = () => {
  const session = useSession()
  const router = useRouter()

  useEffect(() => {
    if (session?.status == 'authenticated') {
      router.replace('/')
    }
  }, [session, router]);

  return null
}

const SigninPage = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    try {
      const response = await signIn('credentials', {
        redirect: false,
        email: values.email,
        password: values.password,
        isSuper: "false"
      });
      console.log(response);
      if (response?.error) {
        toast("Login Failed!", {
          description: response?.error
        })
      }
      if (response?.ok) {
        toast("Login Success..", {
          description: "Welcome back " + values.email
        })
        router.replace('/')
      }
    } catch (error) {
      console.log("Error on signing in: \n", error);
    } finally {
      form.reset();
      setLoading(false);
    }
  }

  return (
    <div className='flex flex-col justify-center items-center h-screen p-4'>
      <CheckAuth />
      <div className='mb-4'>
        <h1 className='text-3xl text-neutral-200 font-mono font-bold text-center'>Macsergen</h1>
        <p className='text-neutral-400 text-center text-sm font-medium capitalize'>MacId Serial Number Generator, Please sign in to continue</p>
      </div>
      <div className='w-full lg:w-[400px]'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-xs font-medium text-neutral-300'>User Email</FormLabel>
                  <FormControl>
                    <Input placeholder="registered email" className='text-neutral-200' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-xs font-medium text-neutral-300'>User Password</FormLabel>
                  <FormControl>
                    <Input placeholder="password" type="password" className='text-neutral-200' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className='w-full py-4'>
              <Button type="submit" variant="default" className='w-full bg-gradient-to-br from-neutral-700 to-neutral-800 cursor-pointer hover:from-neutral-800 hover:to-neutral-900 font-semibold'>SIGN IN</Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}

export default SigninPage