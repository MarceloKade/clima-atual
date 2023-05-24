interface ButtonProps {
    title: string;
}

export function Button(props: ButtonProps) {
    return (
        <p>{props.title}</p>
    )
}