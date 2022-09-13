package entity

// Person object for REST(CRUD)
type Picture struct {
	ID       int    `json:"id"`
	Type     string `json:"type" gorm:"type""`
	Genre    string `json:"genre" gorm:"genre"`
	Album    string `json:"album" gorm:"album"`
	Filename string `json:"filename" gorm:"filename"`
}
