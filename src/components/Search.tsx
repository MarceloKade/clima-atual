interface SearchProps {
    type: string,
}

export function Search(props: SearchProps) {
    return (
        <div className="flex justify-center min-h-screen">
            <div className="max-w-[500px]">
                <input className="w-full border border-orange-300 rounded-md focus:border-orange-500 focus:outline-none" type={props.type} />
            </div>
        </div>

    )
}