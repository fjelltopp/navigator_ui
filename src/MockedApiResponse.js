var Chance = require('chance');
var chance = new Chance();

export default function getMockedApiResponse() {
    const html = (
        <>
            <h3>{chance.sentence({ words: 3 }).replace('.', ':')}</h3>
            <p>{chance.paragraph({ sentences: 3 })}</p>
            <ol>
                {[1, 2, 3, 4, 5].map(x =>
                    <li>{chance.paragraph({ sentences: 2 })}</li>
                )}
            </ol>
        </>
    );
    return {
        title: chance.sentence({ words: 3 }),
        display_html: html,
        skippable: chance.bool(),
        progress: {
            milestones: [
                'User Profile & Survey',
                'Data Prep',
                'Spectrum',
                'Shiny90',
                'Naomi',
            ],
            percentage: chance.integer({ min: 2, max: 98 })
        }
    };
}

export const getMockedProjects = () => {
    const projects = Array.from(Array(chance.integer({ min: 1, max: 4 })));
    return projects.map((project, index) => ({
        id: index,
        name: [
            chance.country({ full: true }),
            'Inputs UNAIDS Estimates',
            chance.integer({ min: 2000, max: 2022 })
        ].join(' '),
        milestones: [
            { name: 'Task 1.0 - User Profile Survey', progress: 100 },
            { name: 'Task 1.1 - Data Prep', progress: 100 },
            { name: 'Task 1.2 - Data Prep', progress: chance.integer({ min: 2, max: 98 }) },
            { name: 'Task 2.0 - Workshop', progress: 0 },
            { name: 'Task 2.1 - Workshop', progress: 0 }
        ]
    }))
}