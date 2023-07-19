/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex.schema.raw('TRUNCATE item CASCADE')
  await knex('item').del()
  await knex('item').insert([
    {
      user_id: 1,
      name: "Krabby Patty Pillow",
      description: "Dream of flipping Krabby Patties while snoozing in the cozy embrace of this seafoam delicacy! A must-have for any SpongeBob fan, it'll make you wish you could live in a pineapple under the sea! Caution: You might start talking like a certain yellow sponge in your sleep!",
      quantity: 3
    },
    {
        user_id: 1,
        name: "Jellyfish Umbrella",
        description: "Beware the jellyfish sting, but don’t worry, this electrifying umbrella will keep you dry, even during the most torrential underwater rainstorms! Just make sure you don’t use it to catch jellyfish or things might get shockingly funny!",
        quantity: 1
    },
    {
        user_id: 3,
        name: "Squidward's Serenade Clarinet",
        description: "Play melancholic melodies or just annoying tunes with this Squidward-certified clarinet. Guaranteed to test the patience of anyone within earshot, but you might just discover your inner musical genius!",
        quantity: 5
    },
    {
        user_id: 1,
        name: "Bubble Buddy Soap",
        description: "Crafted from the finest sea suds, this Bubble Buddy Soap will keep you squeaky clean and ready for any bubble adventures you might embark on. Warning: May cause giggles and bubbly excitement!",
        quantity: 2
    },
    {
        user_id: 1,
        name: "Plankton's Secret Formula Notebook",
        description: "Safeguard your most ingenious (or not-so-ingenious) plans for stealing the Krabby Patty Secret Formula in this super secret notebook! Just remember, even if you fail, the fun is in the trying!",
        quantity: 1
    },
    {
        user_id: 1,
        name: "Mermaid Man and Barnacle Boy Action Figures",
        description: "Bring your favorite superhero duo to life with these action figures! Relive their epic adventures and create your own hero vs. villain showdowns. Sidekicks not included, but you can always recruit a loyal buddy!",
        quantity: 10
    },
    {
        user_id: 1,
        name: "Sandy's Underwater Tree Dome Kit",
        description: "Transform your living room into a mini Bikini Bottom with this DIY kit! Enjoy the thrill of living like Sandy Cheeks, but be prepared for the hilarious mishaps that might follow. Includes a complimentary air helmet for land-dwellers!",
        quantity: 1
    },
    {
        user_id: 2,
        name: "Patrick's Super Wumbo Belt",
        description: "Become the master of wumbo (which is, of course, first-grade sponge lingo for \"super-sized\") with Patrick Star’s patented Super Wumbo Belt! Perfect for enlarging your ice cream cone or jellyfishing net!",
        quantity: 4
    },
    {
        user_id: 1,
        name: "Gary's Snail Slime Bubble Bath",
        description: "Indulge in the luxuriousness of snail slime with this bubbly bath time treat! Feel the gentle embrace of Gary's gooey secret for the softest, smoothest skin, and maybe even communicate in meows!",
        quantity: 1
    },
    {
        user_id: 1,
        name: "Barnacles Away Soap Dispenser",
        description: "Wash away the barnacles of the day with this nautical soap dispenser! Let the bubbly aroma of the ocean breeze transport you to a world of underwater shenanigans and pineapple dwellings.",
        quantity: 2
    },
    {
        user_id: 1,
        name: "SpongeBob's Pineapple Kazoo",
        description: "Doodle-doo-doo-doo! To make music that's catchy and fine, just toot on this kazoo from a pineapple's rind! But be warned, once you start playing, it's hard to stop, and soon all your friends will be \"doo-doo-doo-doo\" non-stop!",
        quantity: 1
    },
    {
        user_id: 1,
        name: "Seahorse Carousel",
        description: "Ride into imaginary adventures aboard your very own seahorse! Feel the wind in your face and pretend you are in Goo Lagoon, just like SpongeBob and his pals. Seahorses not included, but imagination is!",
        quantity: 2
    },
    {
        user_id: 1,
        name: "Pearl Krabs Pearl Necklace",
        description: "Rock a pearl-icious fashion statement with Pearl Krabs’ signature necklace! Shine like a star and show off your inner diva, whether you’re attending the prom or a fancy underwater soiree!",
        quantity: 1
    },
    {
        user_id: 3,
        name: "Squidward's Self-Portrait Kit",
        description: "Unleash your artistic talents and create a masterpiece just like Squidward! The kit includes an easel, a canvas, and the ultimate Squidward nose stencil for true artistic authenticity!",
        quantity: 5
    },
    {
        user_id: 1,
        name: "Kelp Shake Mixer",
        description: "Blend the finest kelp into a refreshing beverage with this specially designed mixer! Your taste buds might not know what hit them, but hey, it's the perfect drink for a day in Bikini Bottom!",
        quantity: 2
    },
    {
        user_id: 1,
        name: "Flying Dutchman's Treasure Chest",
        description: "Legend has it, this cursed treasure chest contains the ghostly riches of the Flying Dutchman himself! Handle with care or you might end up with a haunted booty. Use at your own peril (and amusement)!",
        quantity: 6
    },
    {
        user_id: 1,
        name: "Mr. Krabs Moneybag Piggy Bank",
        description: "Feeling the urge to hoard like a certain crustacean? This piggy bank will help you save your doubloons and cents. Remember, money isn't everything, but it sure is nice to have!",
        quantity: 3
    },
    {
        user_id: 1,
        name: "Chum Bucket Hard Hat",
        description: "Protect your noggin from falling chum buckets and other Plankton-inspired mishaps! Just make sure you don't accidentally join Team Plankton when you put it on. Safety first, comedy second!",
        quantity: 1
    },
    {
        user_id: 1,
        name: "SpongeBob's Karate Chops Remote Control",
        description: "Fancy yourself as a karate expert? Control your TV channels and karate chop through your favorite shows with SpongeBob's hilarious remote! Make your own sound effects for added fun!",
        quantity: 8
    },
    {
        user_id: 1,
        name: "SpongeBob Fish Tank",
        description: "Bring Bikini Bottom to life with this SpongeBob-themed fish tank! Your fish will feel right at home, and you might even catch SpongeBob and his friends dropping by for a surprise visit!",
        quantity: 2
    }   
  ]);
};
