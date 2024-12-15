export default function Section({ title, children }) {
    return (
        <div className="mx-24 mt-12 flex flex-col rounded-3xl bg-yellow-500/25 backdrop-blur outline outline-1 outline-yellow-500 text-yellow-200 p-8">
            <h1 className="font-pixelify font-bold text-6xl text-yellow-400 mb-6 text-center">
                {title}
            </h1>
            {children}
        </div>
    );
}
