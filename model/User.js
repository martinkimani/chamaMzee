var User = function() {
	this.user_id = null;
	this.user_name = null;
	this.status = null;
	this.create_time = null;
        this.last_login = null;
}

User.prototype.getUser_id = function(){
    return this.user_id;
}

User.prototype.setUser_id = function(id) {
	this.user_id = id;
}

User.prototype.getUser_name = function(){
    return this.user_name;
}

User.prototype.setUser_name = function(user_name) {
	this.user_name = user_name;
}

User.prototype.getStatus = function(){
    return this.status;
}

User.prototype.setStatus = function(status){
    this.status = status;
}

User.prototype.getCreateTime = function(){
    return this.create_time;
}

User.prototype.setCreateTime = function(create_time){
    this.create_time = create_time;
}

User.prototype.getLastlogin = function(){
    return this.last_login;
}

User.prototype.setLastlogin = function(last_login){
    this.last_login = last_login;
}

module.exports= User;