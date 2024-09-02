const asyncHandler = require('express-async-handler');
const Contact = require('../models/contactModel');

//@Desc Get all Contacts
//@route GET /api/contacts
//@access private
const getContacts = asyncHandler(async (req, res) => {

    const contacts = await Contact.find({user_id: req.user.id});
    res.status(200).json(contacts);
});






//@Desc Get Contact by id
//@route GET /api/contacts/:id
//@access private
const getContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }
    res.status(200).json(contact);
});

//@Desc Create Contact
//@route POST /api/contacts
//@access private
const createContact = asyncHandler(async (req, res) => {
    //console.log("The request body is: ", req.body.name); 
    // console.log("The name is: ", req.body.name);
    // console.log("The email is: ", req.body.email);
    // console.log("The phone is: ", req.body.phone);
    const { name, email, phone } = req.body;
    if(!name || !email || !phone){
        res.status(400);
        throw new Error("All fields are required");
    }
    const contact = await Contact.create({ name, email, phone, user_id:req.user.id});
    res.status(201).json(contact);
});

//@Desc Update Contact by id
//@route PUT /api/contacts/:id
//@access private
const updateContact = asyncHandler (async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }


    if(contact.user_id.toString() !== req.params.id){
        res.status(403);
        throw new Error("Unauthrized to update contact");
    }
    const updateContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );
    res.status(200).json(updateContact);
});


//@Desc Delete Contact by id
//@route DELETE /api/contacts/:id
//@access private
const deleteContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }

    if(contact.user_id.toString() !== req.params.id){
        res.status(403);
        throw new Error("Unauthrized to delete contact");
    }
    const deletedContact = await Contact.findByIdAndDelete(req.params.id);
    res.status(200).json(deletedContact);
});

module.exports = { 
    getContacts, 
    getContact, 
    createContact, 
    updateContact, 
    deleteContact 
};