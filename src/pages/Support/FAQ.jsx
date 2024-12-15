import Section from "../../components/Section.jsx";

export default function FAQ() {
    const faqs = [
        { question: "What is this game about?", answer: "It's a 2D game inspired by classic farming and adventure games where you explore, farm, and build relationships with NPCs." },
        { question: "Is this game multiplayer?", answer: "Yes, our game will support multiplayer functionality, allowing you to play with friends!" },
        { question: "How do I report bugs?", answer: "You can report bugs through the Contact page or by emailing our support team." },
    ];

    return (
        <Section title={"FAQ"}>
            <div className="w-full max-w-3xl">
                {faqs.map((faq, index) => (
                    <div key={index} className="mb-4">
                        <h2 className="font-bold text-2xl mb-2">{faq.question}</h2>
                        <p>{faq.answer}</p>
                    </div>
                ))}
            </div>
        </Section>
    );
}
