/**
 * Controller for Category Types
 */

import { GetCategoryTypes, GetCategoryTypeById, AddCategoryType, UpdateCategoryType, DeleteCategoryType } from "../models/categoryTypeModel.js";
import { Request, Response, NextFunction } from "express";

export const renderCategoryTypesPage = async function(request: Request, response: Response) {
	const newCategoryTypesInvoke = new GetCategoryTypes();
	const readAllCategoryTypes = await newCategoryTypesInvoke.readAll();

	response.render("dashboard/pages/category-types", {
		categoryTypes: readAllCategoryTypes
	});
};

export const renderCreateCategoryTypePage = function(request: Request, response: Response) {
	response.render("dashboard/pages/category-types/create-category-type");
};

export const renderUpdateCategoryTypePage = async function(request: Request, response: Response) {
	const categoryTypeId = request.params.id;
	const newGetCategoryTypes = new GetCategoryTypes();
	const getCategoryTypeById = await newGetCategoryTypes.readById(categoryTypeId);

	response.render("dashboard/pages/category-types/update-category-type", {
		categoryTypeIdParam: categoryTypeId,
		typeName: getCategoryTypeById.type_name
	});
};

export const renderDeleteCategoryTypePage = async function(request: Request, response: Response, next: NextFunction) {
	try {
		const categoryTypeId = request.params.id;
		const newGetCategoryTypes = new GetCategoryTypes();
		const getCategoryTypeById = await newGetCategoryTypes.readById(categoryTypeId);

		response.render("dashboard/pages/category-types/delete-category-type", {
			categoryTypeIdParam: categoryTypeId,
			typeName: getCategoryTypeById.type_name
		});
	} catch(err) {
		next(err);
	}
};

export const readCategoryTypes = async function(request: Request, response: Response) {
	const retrieveCategoryTypes = new GetCategoryTypes();
	const result = await retrieveCategoryTypes.readAll();

	response.status(200).json(result);
};

export const readCategoryTypesById = async function(request: Request, response: Response) {
	const categoryTypeId = request.params.id;
	const retrieveCategoryTypes = new GetCategoryTypeById(categoryTypeId);

	const result = await retrieveCategoryTypes.readById();

	response.status(200).json(result);
};

export const createCategoryType = async function(request: Request, response: Response) {
	const { type_name } = request.body;
	const newCategoryType = new AddCategoryType(type_name);
	const result = await newCategoryType.create();

	const newCategoryTypesInvoke = new GetCategoryTypes();
	const readAllCategoryTypes = await newCategoryTypesInvoke.readAll();

	response.status(201).render("dashboard/pages/category-types", {
		result,
		categoryTypes: readAllCategoryTypes
	});
};

export const updateCategoryType = async function(request: Request, response: Response, next: NextFunction) {
	try {
		const { type_name } = request.body;
		const categoryTypeId = request.params.id;
		const newUpdateCategoryType = new UpdateCategoryType(categoryTypeId, type_name);
		const result = await newUpdateCategoryType.update();

		const newCategoryTypesInvoke = new GetCategoryTypes();
		const readAllCategoryTypes = await newCategoryTypesInvoke.readAll();

		response.status(200).render("dashboard/pages/category-types", {
			result,
			categoryTypes: readAllCategoryTypes
		});
	} catch(err) {
		next(err);
	}
};

export const deleteCategoryType = async function(request: Request, response: Response, next: NextFunction) {
	try {
		const categoryTypeId = request.params.id;
		const newDeleteCategoryType = new DeleteCategoryType(categoryTypeId);
		const result = await newDeleteCategoryType.delete();

		const newCategoryTypesInvoke = new GetCategoryTypes();
		const readAllCategoryTypes = await newCategoryTypesInvoke.readAll();

		response.status(200).render("dashboard/pages/category-types", {
			result,
			categoryTypes: readAllCategoryTypes
		});
	} catch(err) {
		next(err);
	}
};