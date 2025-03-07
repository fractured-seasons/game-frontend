export default function Section({ title, children, className, defaultFont, marginTop = true }) {
    return (
        <div className={`${className} mx-4 sm:mx-12 lg:mx-24 ${marginTop ? "mt-8 sm:mt-10 lg:mt-12" : ""} flex flex-col rounded-3xl bg-yellow-500/25 backdrop-blur outline outline-1 outline-yellow-500 text-yellow-200 p-4 sm:p-6 lg:p-8 shadow-md`}>
            <h1 className={` ${defaultFont ? '' : 'font-pixelify'} font-bold text-3xl sm:text-4xl lg:text-6xl text-yellow-400 mb-4 sm:mb-5 lg:mb-6 text-center`}>
                {title}
            </h1>
            {children}
        </div>
    );
}
