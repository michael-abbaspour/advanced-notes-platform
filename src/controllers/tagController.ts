/**
 * Controller used for Tags.
 */

import { Request, Response, NextFunction } from "express";
import { GetTags, GetTagById, AddTag, UpdateTag, DeleteTag } from "../models/tagModel.js";
import { GetColors } from "../models/colorModel.js";

export const renderTagsPage = async function(request: Request, response: Response) {
	const newTags = new GetTags();
	const readAllTagsJoin = await newTags.readForeignKeyLeftJoin();

	response.render("dashboard/pages/tags", {
		tags: readAllTagsJoin
	});

};

export const renderCreateTagPage = async function(request: Request, response: Response) {
	const newColors = new GetColors();
	const readAllColors = await newColors.readColors();

	response.render("dashboard/pages/tags/create-tag", {
		colors: readAllColors
	});
};

export const renderUpdateTagPage = async function(request: Request, response: Response) {
	const tagId = request.params.id;

	const newGetTagById = new GetTagById(tagId);
	const getTagById = await newGetTagById.getById();
	const newColors = new GetColors();
	const readAllColors = await newColors.readColors();

	response.render("dashboard/pages/tags/update-tag", {
		tagIdParam: tagId,
		tagName: getTagById.tag_name,
		tagDescription: getTagById.tag_description,
		colorId: getTagById.color_id,
		colors: readAllColors
	});
};

export const renderDeleteTagPage = async function(request: Request, response: Response, next: NextFunction) {
	try {
		const tagId = request.params.id;
		const newTagById = new GetTagById(tagId);
		const readTagById = await newTagById.getById();

		response.render("dashboard/pages/tags/delete-tag", {
			tagIdParam: tagId,
			tagName: readTagById.tag_name
		});
	} catch(err) {
		next(err);
	}
};

export const readAllTags = async function (request: Request, response: Response) {
	const newTags = new GetTags();
	const result = await newTags.readAll();

	response.status(200).json(result);
};

export const readTagId = async function (request: Request, response: Response) {
	const tagId = request.params.id;

	const newTagId = new GetTagById(tagId);
	const result = await newTagId.getById();

	response.status(200).json(result);
};

export const createTag = async function (request: Request, response: Response, next: NextFunction) {
	try {
		const { tag_name, tag_description, color_id } = request.body;
		const newTag = new AddTag(tag_name, tag_description, color_id);
		const result = await newTag.create();

		const newTags = new GetTags();
		const readAllTagsJoin = await newTags.readForeignKeyLeftJoin();

		response.status(201).render("dashboard/pages/tags", {
			result,
			tags: readAllTagsJoin
		});
	} catch(err) {
		next(err);
	}
};

export const updateTag = async function(request: Request, response: Response, next: NextFunction) {
	try {
		const {tag_name, tag_description, color_id} = request.body;
		const tagId = request.params.id;
		const newUpdateTag = new UpdateTag(tagId, tag_name, tag_description, color_id);
		const result = await newUpdateTag.update();

		const newTags = new GetTags();
		const readAllTagsJoin = await newTags.readForeignKeyLeftJoin();

		response.status(200).render("dashboard/pages/tags", {
			result,
			tags: readAllTagsJoin
		});
	} catch(err) {
		next(err);
	}
};

export const deleteTag = async function(request: Request, response: Response, next: NextFunction) {
	try {
		const tagId = request.params.id;
		const newDeleteTag = new DeleteTag(tagId);
		const result = await newDeleteTag.delete();

		const newTags = new GetTags();
		const readAllTagsJoin = await newTags.readForeignKeyLeftJoin();

		response.status(200).render("dashboard/pages/tags", {
			result,
			tags: readAllTagsJoin
		});
	} catch(err) {
		next(err);
	}
};