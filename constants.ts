
export const PHONE_NUMBER = "+31 6 84111366";
export const EMAIL_ADDRESS = "info@betrouwbouw.nl";
export const WHATSAPP_LINK = `https://wa.me/31684111366`;
export const BLOG_POST_LINK = '#/blog/subsidies-for-windows-netherlands-2025';

// This is a helper function to create image URLs.
// In a real project, you would replace these with paths to your actual images in the `assets` folder.
// For example: `import project1_1 from './assets/images/project1_1.jpg'`
// For now, we use a placeholder service.
export const getImageUrl = (key: string, width: number = 800, height: number = 600) => {
    // A simple hash function to get a somewhat unique image from a key
    const seed = key.split('').reduce((acc, char) => char.charCodeAt(0) + ((acc << 5) - acc), 0);
    return `https://picsum.photos/seed/${seed}/${width}/${height}`;
}
