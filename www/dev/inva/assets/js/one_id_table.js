oskn.namespace('oskn', function () {
	this.OneIdTable = function(app) {
		this.app = app;
		this.values = [];
	};
	var cls = this.OneIdTable;

	cls.prototype.setup = function(idType) {
		this.autoIncrementId = 0;
		this.idType = idType;
		return this;
	};

	cls.prototype.free = function() {
		for (var i = this.values.length - 1; 0 <= i; --i) {
			var item = this.values[i];
			item.free();
		}
		this.values.splice(0, this.values.length);
		this.autoIncrementId = 0;
	};

	cls.prototype.createId = function() {
		++this.autoIncrementId;
		return oskn.AppObjectId.getOrCreate(this.idType, this.autoIncrementId);
	};

	cls.prototype.findIndexById = function(id) {
		var index = this.values.findIndex(function(_item) {
			return _item.id.equals(id);
		}, id);
		return index;
	};

	cls.prototype.findById = function(id) {
		var index = this.findIndexById(id);
		if (index === -1)
			return null;
		return this.values[index];
	};

	cls.prototype.add = function(item) {
		if (!item.id || item.id.isEmpty()) {
			item.id = this.createId();
		}
		if (this.findById(item.id) !== null) {
			throw "キーの重複: " + item.id;
		}
		this.values.push(item);
	};

	cls.prototype.remove = function (item) {
		var index = this.findIndexById(item.id);
		this.values.splice(index, 1);
	};

	cls.prototype.forEach = function (func, self) {
		for (var i = 0, iMax = this.values.length; i < iMax; ++i) {
			var item = this.values[i];
			func.call(self, item);
		}
	};

	return cls;
});

