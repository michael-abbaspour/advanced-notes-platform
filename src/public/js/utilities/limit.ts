/**
 * Client-side utility functions used for limiting items (ex: text).
 */

export const limitText = function(text: string, limit: number) {
	return text.substring(0, limit);
};