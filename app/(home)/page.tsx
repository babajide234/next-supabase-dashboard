import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Home() {
	return (
		<main className="flex items-center justify-center w-full h-screen ">
			<div className="flex flex-col items-center gap-4 ">
				<Image 
					src={'/logo.png'}
					width={200}
					height={200}
					alt="Logo"
				/>
				<h1 className="text-4xl font-bold ">PDP EXCOS</h1>
				<p className="text-2xl font-semibold text-gray-600">Directorate of Organization and Mobilization ©2024</p>
				<Button variant={'default'} size={'lg'} asChild>
					<Link href='/dashboard'>
						Login
					</Link>
				</Button>
			</div>
		</main>
	);
}
