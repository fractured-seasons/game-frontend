import Section from "./Section";

export default function AuthWrapper({ title, children }) {
    return (
        <div className="min-w-screen min-h-screen flex justify-center items-center p-4 bg-cover bg-center bg-no-repeat">
            <Section title={title}>
                {children}
            </Section>
        </div>
    );
}
