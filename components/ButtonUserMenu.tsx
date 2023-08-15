"use client"
import { Session } from "next-auth"
import { signIn, signOut } from "next-auth/react"
import Image from "next/image"


interface ButtonUserMenuProps {
    session: Session | null
}

const ButtonUserMenu = ({ session }: ButtonUserMenuProps) => {
    const user = session?.user
    return (
        <div className="dropdown dropdown-end">

            <label tabIndex={0} className="btn btn-ghost btn-circle">
                {user
                    ? (
                        <Image
                            src={user.image!}
                            // src={user?.image || "/default-profile.png"}
                            alt={user?.name || "profile picture"}
                            width={40}
                            height={40}
                            className=" rounded-full"
                        />
                    )
                    :
                    <Image
                        // src={user.image!}
                        src={"/default-profile.png"}
                        alt={"profile picture"}
                        width={40}
                        height={40}
                        className=" rounded-full"
                    />
                }
            </label>

            <ul
                tabIndex={0}
                className=" dropdown-content menu rounded-box menu-sm z-30 mt-3 w-52 bg-base-200 p-2 shadow"
            >
                <li>
                    {user
                        ? <button onClick={() => signOut({ callbackUrl: "/" })}>Sign Out</button>
                        : <button onClick={() => signIn()}>Sign In</button>
                    }
                </li>
            </ul>

        </div>
    )
}

export default ButtonUserMenu