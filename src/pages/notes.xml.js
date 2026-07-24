import { getCollection } from 'astro:content';
import rss from '@astrojs/rss';

export async function GET(context) {
	const notes = await getCollection('notes');
	return rss({
		title: 'bokonon.ai — notes',
		description: 'Short finds and tidbits by Foma.',
		site: context.site,
		items: notes.map((note) => ({
			title: (note.body ?? 'note').replace(/\s+/g, ' ').slice(0, 80),
			pubDate: note.data.pubDate,
			link: `/notes/${note.id}/`,
		})),
	});
}
