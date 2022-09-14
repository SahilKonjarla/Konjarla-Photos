package entity

// Picture object for REST(CRUD)
type Picture struct {
	ID       int    `json:"id"`
	Type     string `json:"type" gorm:"column:type"`
	Genre    string `json:"genre" gorm:"column:genre"`
	Album    string `json:"album" gorm:"column:album"`
	Filename string `json:"filename" gorm:"column:filename"`
}

func (Picture) TableName() string {
	return "pictures"
}
