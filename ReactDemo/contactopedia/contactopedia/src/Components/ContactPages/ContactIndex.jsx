import React from "react";
import Header from "../Layout/Header";
import Footer from "../Layout/Footer";
import AddRandomContacts from "./AddRandomContacts";
import RemoveAllContact from "./RemoveAllContact"; 
import AddContact from "./AddContact";
import FavoriteContacts from "./FavoriteContacts";
import GeneralContacts from "./GeneralContacts";

class ContactIndex extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            contactList: [
                {
                    id: 1,
                    name: "Ben Parker",
                    phone: "666-858-7555",
                    email: "ben12@parker.com",
                    isFavorite: false,
                },
                {
                    id: 2,
                    name: "Krish Walley",
                    phone: "747-969-6321",
                    email: "krish@12walley.com",
                    isFavorite: true,
                },
                {
                    id: 3,
                    name: "Paul Show",
                    phone: "745-856-9632",
                    email: "paul@show.com",
                    isFavorite: true,
                },
            ],
            selectedContact: undefined,
            isUpdating: false,
        };
    }

    handleAddContact = (newContact) => {    
        if(newContact.name==""){
            return {status: "failure", msg:"Please Enter a valid Name"};
        } else if(newContact.phone==""){
            return {status: "failure", msg:"Please Enter a valid Phone Number"};
        }
        const duplicateRecord = this.state.contactList.filter((x) => {
            if(x.name==newContact.name && x.phone==newContact.phone){
                return true;
            }
        })
        if(duplicateRecord.length > 0){
            return {status:"failure", msg:"Duplicate Record"}
        }
        else{

       const newFinalContact = {
        ...newContact,
        id: this.state.contactList[this.state.contactList.length - 1].id + 1,
        isFavorite: false
       };
       this.setState((prevState) => {
        return {
            contactList: prevState.contactList.concat([newFinalContact]),
        };
       });
       return { status: "success", msg: "Contact was added successfully" };
    }

};


    handleUpdateContact = (updatedContact) => {    
        console.log(updatedContact);
    if(updatedContact.name==""){
        return {status: "failure", msg:"Please Enter a valid Name"};
    } else if(updatedContact.phone==""){
        return {status: "failure", msg:"Please Enter a valid Phone Number"};
    }
   this.setState((prevState) => {
    return {
        contactList: prevState.contactList.map((obj) => {
            if (obj.id == updatedContact.id) {
                return {
                    ...obj,
                    name: updatedContact.name,
                    email: updatedContact.email,
                    phone: updatedContact.phone,
                };
            }
            return obj;
        }),
        isUpdating: false,
        selectedContact: undefined,
    };
   });
   return { status: "success", msg: "Contact was updated successfully" };
};

handleToggleFavorites = (contact) => {    
    this.setState((prevState) => {
        return {
            contactList: prevState.contactList.map((obj) =>  {
                if(obj.id == contact.id) {
                    return { ...obj, isFavorite: !obj.isFavorite };
                }
                return obj;
            }),
        };
    });
       
};

handleDeleteContact = (contactId) => {    
    this.setState((prevState) => {
        return {
            contactList: prevState.contactList.filter((obj) =>  {
               return obj.id!== contactId;    
            }),
        };
    });
};


handleAddRandomContact = (newContact) => {
    const newFinalContact = {
        ...newContact,
        id: this.state.contactList[this.state.contactList.length - 1].id + 1,
        isFavorite: false
    };
    this.setState((prevState) => {
        return {
            contactList: prevState.contactList.concat([newFinalContact]),
        };
    });
};


handleRemoveAllContext = () => {
    this.setState((prevState) => {
        return {
            contactList: [],
        };
    });
};


handleUpdateClick = (contact) => {
    console.log(contact);   
    this.setState((prevState) => {
        return {
            selectedContact: contact,
            isUpdating: true,
        };
    }); 
};


handleCancelUpdateClick = (contact) => {
    console.log(contact);   
    this.setState((prevState) => {
        return {
            selectedContact: undefined,
            isUpdating: false,
        };
    }); 
};
    render() {
        return (
            <div>
                <Header/>
                <div className="container" style={ {minHeight:"85vh" }}>
                    <div className="row py-3">
                        <div className="col-4 offset-2 row">
                            <AddRandomContacts
                            handleAddRandomContact = {this.handleAddRandomContact}/>
                        </div>
                        <div className="col-4 row">
                            <RemoveAllContact handleRemoveAllContext = {this.handleRemoveAllContext}/>
                        </div>
                        <div className="row py-2">
                            <div className="col-8 offset-2 row">
                                <AddContact handleAddContact={this.handleAddContact} 
                                  isUpdating={this.state.isUpdating}
                                  selectedContact={this.state.selectedContact} 
                                  cancelUpateContact={this.handleCancelUpdateClick}
                                  handleUpdateContact={this.handleUpdateContact}
                                />
                            </div>
                        </div>
                        <div className="row py-2">  
                            <div className="col-8 offset-2 row">
                                <FavoriteContacts contacts={this.state.contactList.filter(
                                    (u)=> u.isFavorite == true
                                )}
                                favoriteClick={this.handleToggleFavorites}
                                deleteContact={this.handleDeleteContact}
                                updateClick={this.handleUpdateClick}
                                />
                            </div>
                        </div>
                        <div className="row py-2">
                            <div className="col-8 offset-2 row">
                                <GeneralContacts contacts={this.state.contactList.filter(
                                    (u) => u.isFavorite == false
                                )}
                                favoriteClick={this.handleToggleFavorites}
                                deleteContact={this.handleDeleteContact}
                                updateClick={this.handleUpdateClick}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <Footer/>
            </div>
        );   
    };
};

export default ContactIndex;