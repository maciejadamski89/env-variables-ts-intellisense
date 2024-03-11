// * import env
import "@/utils/env";

export default function Home() {
    const url = process.env.URL;
    const str = process.env.STRING;
    const nbr = process.env.NUMBER;
    return (
        <>
            <p>{url}</p>
            <p>{str}</p>
            <p>{nbr}</p>
        </>
    );
}
