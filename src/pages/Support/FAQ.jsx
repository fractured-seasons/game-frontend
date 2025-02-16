import Section from "../../components/Section.jsx";

export default function FAQ() {
    const faqs = [
        { question: "What is this game about?", answer: "This game is a relaxing simulator that focuses on farming, resource management and exploration. There is no combat in the game." },
        { question: "Does the game have a main story?", answer: "There is no main story, but the goal is to explore the world, develop your farm and discover little details about the environment." },
        { question: "Does the game have a multiplayer mode?", answer: "Currently, the game is single-player only, but we are planning to add a multiplayer mode in the future, depending on community feedback." },
        { question: "How can I plant seeds?", answer: "To plant seeds, choose a spot on your plot of land, use the hoe to prepare the soil, select seeds from the inventory and plant them." },
        { question: "Can I cut down all the trees?", answer: "Yes, you can cut down trees near your farm, but be careful, they only grow back after a few days." },
        { question: "Are there map boundaries?", answer: "Yes, the map has boundaries, but it is quite large and offers many areas to explore." },
        { question: "Can I expand the farm?", answer: "Yes, you can expand the farm by building new spaces or removing obstacles around it." },
        { question: "Can I customize my character?", answer: "No, we currently do not have personal character customization implemented." },
        { question: "Is the game suitable for children?", answer: "Yes, the game is suitable for all ages with friendly and relaxing content." },
        { question: "How can I get more resources quickly?", answer: "To get resources more efficiently, invest in better tools and explore resource-rich areas." },
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
