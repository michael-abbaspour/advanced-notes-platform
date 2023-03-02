/**
 * Controller for Categories.
 */

import { Request, Response, NextFunction } from "express";
import { GetCategories, AddCategory, UpdateCategory, DeleteCategory } from "../models/categoryModel.js";
import { GetCategoryTypes } from "../models/categoryTypeModel.js";
import { GetColors } from "../models/colorModel.js";

export const renderCategoriesPage = async function(request: Request, response: Response) {
	const newCategories = new GetCategories();
	const readCategoriesLeftJoin = await newCategories.readForeignTableJoin();

	const newCategoryTypes = new GetCategoryTypes();
	const readCategoryTypes = await newCategoryTypes.readAll();

	response.render("dashboard/pages/categories", {
		categories: readCategoriesLeftJoin,
		categoryTypes: readCategoryTypes
	});
};

export const renderCreateCategoryPage = async function (request: Request, response: Response) {
	const newCategoryTypes = new GetCategoryTypes();
	const newColors = new GetColors();

	const readCategoryTypes = await newCategoryTypes.readAll();
	const readColors = await newColors.readColors();

	response.render("dashboard/pages/categories/create-category", {
		categoryTypes: readCategoryTypes,
		colors: readColors
	});
};

export const renderUpdateCategoryPage = async function(request: Request, response: Response) {
	const categoryId = request.params.id;
	const newGetCategories = new GetCategories();
	const getCategoryById = await newGetCategories.readById(categoryId);

	const newCategoryTypes = new GetCategoryTypes();
	const readCategoryTypes = await newCategoryTypes.readAll();

	const newColors = new GetColors();
	const readColors = await newColors.readColors();

	response.render("dashboard/pages/categories/update-category", {
		categoryIdParam: categoryId,
		categoryName: getCategoryById.category_name,
		categoryTypeId: getCategoryById.category_type_id,
		categoryDescription: getCategoryById.category_description,
		colorId: getCategoryById.color_id,
		categoryTypes: readCategoryTypes,
		colors: readColors
	});
};

export const renderDeleteCategoryPage = async function(request: Request, response: Response, next: NextFunction) {
	try {
		const categoryId = request.params.id;
		const newGetCategories = new GetCategories();
		const getCategoryById = await newGetCategories.readById(categoryId);

		response.render("dashboard/pages/categories/delete-category", {
			categoryIdParam: categoryId,
			categoryName: getCategoryById.category_name
		});
	} catch(err) {
		next(err);
	}
};

export const readAllCategories = async function(request: Request, response: Response) {
	const newCategories = new GetCategories();
	const result = await newCategories.readAll();

	response.status(200).json(result);
};

export const createCategory = async function(request: Request, response: Response, next: NextFunction) {
	try {
		const {category_name, category_type_id, category_description, color_id} = request.body;
		const newCategory = new AddCategory(category_name, category_type_id, category_description, color_id);
		const result = await newCategory.create();

		const newCategories = new GetCategories();
		const readCategoriesLeftJoin = await newCategories.readForeignTableJoin();

		const newCategoryTypes = new GetCategoryTypes();
		const readCategoryTypes = await newCategoryTypes.readAll();

		response.status(201).render("dashboard/pages/categories", {
			result,
			categories: readCategoriesLeftJoin,
			categoryTypes: readCategoryTypes
		});
	} catch(err) {
		next(err);
	}
};

export const updateCategory = async function(request: Request, response: Response) {
	const { category_name, category_type_id, category_description, color_id } = request.body;
	const categoryId = request.params.id;
	const newUpdateCategory = new UpdateCategory(categoryId, category_name, category_type_id, category_description, color_id);
	const result = await newUpdateCategory.update();

	const newCategories = new GetCategories();
	const readCategoriesLeftJoin = await newCategories.readForeignTableJoin();

	const newCategoryTypes = new GetCategoryTypes();
	const readCategoryTypes = await newCategoryTypes.readAll();

	response.status(200).render("dashboard/pages/categories", {
		result,
		categories: readCategoriesLeftJoin,
		categoryTypes: readCategoryTypes
	});
};

export const deleteCategory = async function(request: Request, response: Response, next: NextFunction) {
	try {
		const categoryId = request.params.id;
		const newDeleteCategory = new DeleteCategory(categoryId);
		const result = await newDeleteCategory.delete();

		const newCategories = new GetCategories();
		const readCategoriesLeftJoin = await newCategories.readForeignTableJoin();

		const newCategoryTypes = new GetCategoryTypes();
		const readCategoryTypes = await newCategoryTypes.readAll();

		response.status(200).render("dashboard/pages/categories", {
			result,
			categories: readCategoriesLeftJoin,
			categoryTypes: readCategoryTypes
		});
	} catch(err) {
		next(err);
	}
};