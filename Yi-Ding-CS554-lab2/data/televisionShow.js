const showList = [
    {
        name: "The Walking Dead",
        summary: "Sheriff Deputy Rick Grimes gets shot and falls into a coma. When awoken he finds himself in a Zombie Apocalypse. Not knowing what to do he sets out to find his family, after he's done that he gets connected to a group to become the leader. He takes charge and tries to help this group of people survive, find a place to live, and get them food. This show is all about survival, the risks, and the things you'll have to do to survive."
    },
    {
        name: "Shameless",
        summary: "Chicagoan Frank Gallagher is the proud single dad of six smart, industrious, independent kids, who without him would be...perhaps better off. When Frank's not at the bar spending what little money they have, he's passed out on the floor. But the kids have found ways to grow up in spite of him. They may not be like any family you know, but they make no apologies for being exactly who they are."
    },
    {
        name: "Elementary",
        summary: "Sherlock is a recovering addict who meets Joan Watson as his 'sober companion'. Initially their relationship is strictly professional, and somewhat frosty, but they grow to understand and work with one another, eventually forming a friendship and partnership. Together they assist Captain Gregson and Detective Bell of the NYPD, where Holmes' observational abilities and deductive talent unravel a series of complicated cases."
    },
    {
        name: "The Originals",
        summary: "The show begins with the original siblings returning to the city of New Orleans for the first time since 1919. Having originally built the city, they had been forced to flee from their vengeful father. In their absence, Klaus's protégé, Marcel (Charles Michael Davis), took charge of the city."
    },
    {
        name: "Agents of S.H.I.E.L.D. ",
        summary: "The series revolves around the character of Phil Coulson, with Clark Gregg reprising his role from the film series, and his team of S.H.I.E.L.D. agents, who must deal with various unusual cases and enemies, including Hydra and the Inhumans. Joss Whedon began developing a S.H.I.E.L.D."
    },
    {
        name: "Avatar- The Last Airbender",
        summary: "In the Avatar: The Last Airbender universe, there are people who are able to manipulate, or bend, the four elements: Air, Water, Earth, and Fire. Along with the four elements, there are four nations that correspond with each element. Not everyone can bend an element, and those that can can only bend one. "
    },
    {
        name: "2 Broke Girls",
        summary: "Whereas Caroline was raised as the daughter of a billionaire, Max grew up in poverty, resulting in differing perspectives on life, although together they work in a local diner while attempting to raise funds to start a cupcake business."
    },
    {
        name: "Sense8",
        summary: "A group of people around the world are suddenly linked mentally, and must find a way to survive being hunted by those who see them as a threat to the world's order."
    },
    {
        name: "Vicious",
        summary: "Vicious tells the story of partners Freddie and Stuart, who have lived together in a small central London flat for nearly 50 years. They have a deep love for one another. Freddie and Stuart are often joined by feisty best friend Violet and Ash, their young, upstairs neighbor."
    },
    {
        name: "Harlots",
        summary: "Margaret Wells struggles to reconcile her roles as brothel owner and mother to her daughters. When her business comes under attack from a rival madam with a ruthless streak, Margaret must fight back even if it means losing her family and possibly her life."
    }
];

let exportedMethods = {
    getAllShows: () => { return Promise.resolve(showList); },
}

module.exports = exportedMethods;