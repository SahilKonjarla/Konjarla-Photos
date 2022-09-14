package controllers

import (
	"encoding/json"
	"github.com/gorilla/mux"
	"io/ioutil"
	"net/http"
	"rest-go/database"
	"rest-go/entity"
	"strconv"
)

// GetAllPicture get all picture data
func GetAllPicture(w http.ResponseWriter, r *http.Request) {
	var pictures []entity.Picture
	// vars := mux.Vars(r)
	// key := vars["type"]
	pictype := r.URL.Query().Get("type")

	// db := database.Connector.Find(&pictures, entity.Picture{Type: key})
	db := database.Connector.Find(&pictures, entity.Picture{Type: pictype})
	errors := db.GetErrors()
	if len(errors) > 0 {
		for i := 0; i < len(errors); i++ {
			s := errors[i].Error()
			w.Header().Set("Content-Type", "application/json")
			http.Error(w, s, http.StatusBadRequest)
		}
	} else {
		//if strings.Compare(strings.ToLower(pictype), "digital") != 0 || strings.Compare(strings.ToLower(pictype), "film") != 0 {
		//if (strings.ToLower(pictype) != "digital") || strings.ToLower(pictype) != "film" {
		switch pictype {
		case "film", "digital":
			w.Header().Set("Content-Type", "application/json")
			w.WriteHeader(http.StatusOK)
			json.NewEncoder(w).Encode(pictures)
		default:
			w.Header().Set("Content-Type", "application/json")
			http.Error(w, "Invalid Query Parameter", http.StatusBadRequest)
			return
		}
	}
}

// GetPictureID returns picture with specific ID
func GetPictureID(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	key := vars["id"]

	var picture entity.Picture
	db := database.Connector.First(&picture, key)
	errors := db.GetErrors()
	if len(errors) > 0 {
		for i := 0; i < len(errors); i++ {
			s := errors[i].Error()
			w.Header().Set("Content-Type", "application/json")
			http.Error(w, s, http.StatusBadRequest)
		}
	} else {
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(picture)
	}
}

// CreatePicture creates picture
func CreatePicture(w http.ResponseWriter, r *http.Request) {
	requestBody, _ := ioutil.ReadAll(r.Body)
	var picture entity.Picture
	json.Unmarshal(requestBody, &picture)

	db := database.Connector.Create(picture)
	errors := db.GetErrors()
	if len(errors) > 0 {
		for i := 0; i < len(errors); i++ {
			s := errors[i].Error()
			w.Header().Set("Content-Type", "application/json")
			http.Error(w, s, http.StatusBadRequest)
		}
	} else {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusCreated)
		json.NewEncoder(w).Encode(picture)
	}
}

// UpdatePictureByID updates picture with respective ID
func UpdatePictureByID(w http.ResponseWriter, r *http.Request) {
	requestBody, _ := ioutil.ReadAll(r.Body)
	var picture entity.Picture
	json.Unmarshal(requestBody, &picture)

	db := database.Connector.Save(&picture)
	erros := db.GetErrors()
	if len(erros) > 0 {
		for i := 0; i < len(erros); i++ {
			s := erros[i].Error()
			w.Header().Set("Content-Type", "application/json")
			http.Error(w, s, http.StatusBadRequest)
		}
	} else {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		json.NewEncoder(w).Encode(picture)
	}
}

// DeletePictureByID deletes picture with specific ID
func DeletePictureByID(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	key := vars["id"]
	var picture entity.Picture
	id, _ := strconv.ParseInt(key, 10, 64)

	db := database.Connector.Where("id = ?", id).Delete(&picture)
	errors := db.GetErrors()
	if len(errors) > 0 {
		for i := 0; i < len(errors); i++ {
			s := errors[i].Error()
			w.Header().Set("Content-Type", "application/json")
			http.Error(w, s, http.StatusBadRequest)
		}
	} else {
		w.WriteHeader(http.StatusNoContent)
	}
}
