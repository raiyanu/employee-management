import AppHeader from "../components/AppHeader";

export default function Home() {
	return (
		<>
			<AppHeader />
			<form
				action="/api/employee/"
				className="*:max-w-sm *:max-lg:mx-auto *:max-lg:mt-3 lg:grid lg:grid-cols-2 border-2 max-w-2xl gap-y-2 gap-x-4 mx-auto p-4 rounded-lg "
				method="POST"
				encType="multipart/form-data"
			>
				<label className="input input-bordered flex items-center gap-2">
					Name:
					<input type="text" className="grow" placeholder="Name" name="name" />
				</label>
				<label className="input input-bordered flex items-center gap-2">
					Email:
					<input
						type="text"
						className="grow"
						placeholder="Email"
						name="email"
					/>
				</label>
				<label className="input input-bordered flex items-center gap-2">
					Mobile:
					<input
						type="text"
						className="grow"
						placeholder="Mobile"
						name="mobile"
					/>
				</label>
				<label className="input input-bordered flex items-center gap-2">
					Designation:
					<input
						type="text"
						className="grow"
						placeholder="Designation"
						name="designation"
					/>
				</label>
				<label className="input input-bordered flex items-center gap-2">
					Gender: Male
					<input
						type="radio"
						name="gender"
						value="male"
						className="radio"
						defaultChecked
					/>
					Female
					<input type="radio" name="gender" value="female" className="radio" />
				</label>
				<label className="input input-bordered flex items-center gap-2">
					Course:
					<input
						type="text"
						className="grow"
						placeholder="Course"
						name="course"
					/>
				</label>
				<label className="input input-bordered flex items-center gap-2">
					Profile:
					<input
						type="file"
						name="profile"
						accept="image/*"
						className="file-input file-input-bordered rounded file-input-sm grow w-full"
					/>
				</label>
				<button
					type="submit"
					className="block btn btn-primary col-span-2 mx-auto w-full max-w-[300px]"
				>
					Submit
				</button>
			</form>
		</>
	);
}
