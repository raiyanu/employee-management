export default function CountsCard({ title, count, additionalText }) {
    return (
        <div className="max-w-sm bg-white border border-gray-200 shadow dark:bg-gray-800 dark:border-gray-700 grid grid-cols-1 grid-rows-1 rounded-2xl h-fit py-4 flex-grow-0 flex-shrink-0 max-w-52">
            <div className="flex flex-col place-self-center items-center justify-between p-4">
                <p className="text-lg md:text-xl lg:text-4xl font-black">{count}</p>
                <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                    {title}
                </h5>
                <span className="text-sm text-gray-500 dark:text-gray-400 w-full">
                    <span className="text-green-500">{additionalText.featured}</span>{" "}{additionalText.body}
                </span>
            </div>
        </div>

    )
}
