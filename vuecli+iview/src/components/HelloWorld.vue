<template>
   <Row >
        <Col span="6">
            <div>
            	<Button class="aa" type="primary" v-on:click="show" @click="loading">刷新</Button>
            </div>
        </Col>
        <Col span="6">
            <div>
            	<Button class="aa" type="primary" v-on:click="Add"  @click="modal1 = true">新增</Button>
            </div>
        </Col>
        <Col span="6">
            <div>
            	<Button class="aa" type="primary" v-on:click="Edit">编辑</Button>
            </div>
        </Col>
        <Col span="6">
            <div>
            	<Button class="aa" type="primary" v-on:click="Delate">删除</Button>
            </div>
        </Col>
        <br />
 		 <Col span="20" offset="2">
			<Table highlight-row @on-current-change="clickApp" class="tables" height="400" :columns="columns1" :data="data1"></Table>
		</Col>
		<br />
		<Col span="20">
			  <Page :total="total" v-on:on-change="pages" v-on:on-page-size-change="jump" show-elevator show-sizer></Page>
		</Col>
         <!--对话框-->
         <div>
         	 <Modal
		        v-model="modal1"
		        title="新增"
		        @on-ok="ok"
		        @on-cancel="cancel">
		        <p>Name： 
		        	<Input v-model="Name" placeholder="Enter something..." style="width: 300px"></Input>
		        </p>
		        <p>
		        	parent：
		        	 <Input v-model="parent" placeholder="Enter something..." style="width: 300px"></Input>
		        </p>
		    </Modal>
		    <Modal
		        v-model="modal2"
		        title="编辑"
		        @on-ok="Editok"
		        @on-cancel="cancel">
		        <p>Name： 
		        	<Input v-model="Name" placeholder="Enter something..." style="width: 300px"></Input>
		        </p>
		        <p>
		        	parent：
		        	 <Input v-model="parent" placeholder="Enter something..." style="width: 300px"></Input>
		        </p>
		    </Modal>
		     <Modal
		        v-model="modal3"
		        title="提示"
		        @on-ok="Delateok"
		        @on-cancel="cancel">
		        <p>数据删除后无法恢复，确认删除吗？
		        </p>
		    </Modal>
         </div>
        
    </Row>
	 
</template>

<script>
	var qs = require('qs');
    export default {
        data(){
        	return {
        		  columns1: [
                    {
                        title: 'Name',
                        key: 'text'
                    },
                    {
                        title: 'parent',
                        key: 'parent'
                    },
                    {
                        title: 'id',
                        key: '_id'
                    }
                ],
                data1:[],
                modal1: false,
                modal2: false,
                modal3: false,
                value:"hahaha",
                TableId:"",
                URL:"http://e21cd618.ngrok.io",
                Name:"",
                parent:"",
                total:100,
                page:"1",
                rows:"10",
                
        	}
        },
        methods:{
        	show(){
        		//alert(123)
        		let _that =this;
        		_that.TableId="";
          			this.$ajax({
						      method: 'post',
						      url: _that.URL+'/ddd',
						      data:qs.stringify({'page': _that.page ,'rows': _that.rows })
						   }).then(function(res){
							  console.log(res);
							  _that.data1 = res.data.res;							
								_that.total = res.data.total;
							  //获取数据后销毁loading
							  _that.$Message.destroy();
							})
							.catch(function(err){
							  console.log(err);
							  _that.$Message.error({
			        				content:'获取失败'
			        			});
			        			//获取数据后销毁loading
							  this.$Message.destroy();
							})
        	},
        	Add(){
        		//清空数据
        		this.Name ="";
				this.parent ="";
        	},
        	 loading () {
                const msg = this.$Message.loading({
                    content: 'Loading...',
                    duration: 0
                });
                setTimeout(msg, 30000);
           },
        	Edit(){
        		let _that =this;
        		if(this.TableId ==""){
        			this.$Message.warning({
        				content:'请选择相关信息进行编辑',
        				top:500
        			});
        		}else{
        			console.log(this.TableId);
        			//清空数据
	        		_that.Name ="";
					_that.parent ="";
        			_that.loading();
        			_that.modal2=true;
        			 	this.$ajax({
						      method: 'post',
						      url: _that.URL+'/GetModel',
						      data: qs.stringify({ 'TableId': this.TableId })
						   }).then(res=>{
							  console.log(res);
							  _that.Name =res.data[0].text;
							  _that.parent =res.data[0].parent;
							  //this.data1 = res.data;
							  //获取数据后销毁loading
							  this.$Message.destroy();
							})
							.catch(function(err){
							  console.log(err);
							  //获取数据后销毁loading
							  _that.$Message.destroy();
							  this.$Message.error({
			        				content:'获取失败'
			        			});
							})
        		}
        		
        	},
        	Delate(){
        		let _that =this;
        		
        		if(this.TableId ==""){
        			this.$Message.warning({
        				content:'请选择相关信息删除',
        				top:500
        			});
        		}else{
        			_that.modal3=true;
        		}
        	},
        	 ok () {
        	 	let _that =this;
                if(this.Name ==""||this.parent ==""){
                	_that.$Message.warning({
        				content:'请确保信息不为空',
        				top:500
        			});
                }else{
                		this.$ajax({
						      method: 'post',
						      url: _that.URL+'/Add',
						      data: qs.stringify({'Name': this.Name ,'parent': this.parent })
						   }).then(res=>{
							  console.log(res.data);
							  //获取数据后销毁loading
							  this.$Message.destroy();
							  if(res.data){
							  	_that.instance("success")
							  }
							  //this.data1 = res.data;
							  _that.show();
							})
							.catch(function(err){
							  console.log(err);
							  _that.$Message.error({
			        				content:'获取失败'
			        			});
							})
                }
            },
            Editok () {//编辑
                //this.$Message.info('Clicked ok');
                	//alert(123)
        			let _that =this;
        			if(this.Name ==""||this.parent ==""){
                	_that.$Message.warning({
        				content:'请确保信息不为空',
        				top:500
	        			});
	                }else{
	          			this.$ajax({
							      method: 'post',
							      url: _that.URL+'/Edit',
							      data: qs.stringify({ 'TableId': this.TableId ,'Name': this.Name ,'parent': this.parent })
							   }).then(res=>{
								  console.log(res.data);
								  //获取数据后销毁loading
								  this.$Message.destroy();
								  if(res.data){
								  	_that.instance("info")
								  }
								  //this.data1 = res.data;
								  _that.show();
								})
								.catch(function(err){
								  console.log(err);
								  _that.$Message.error({
				        				content:'获取失败'
				        			});
								})
							}
            },
            cancel () {
                this.$Message.info('Clicked cancel');
            } ,
            clickApp(a){
            	console.log(a);
            	this.TableId = a._id;
            },
            Delateok(){
            		let _that =this;
          			this.$ajax({
						      method: 'post',
						      url: _that.URL+'/Delate',
						      data: qs.stringify({ 'TableId': this.TableId})
						   }).then(res=>{
							  console.log(res.data);
							  //获取数据后销毁loading
							  this.$Message.destroy();
							  if(res.data){
							  	_that.instance("warning")
							  }
							  //this.data1 = res.data;
							  _that.show();
							})
							.catch(function(err){
							  console.log(err);
							  _that.$Message.error({
			        				content:'获取失败'
			        			});
							})
            },
            pages(a){
            	let _that =this;
            	console.log(a)
            	_that.page = a;
            	_that.show();
            },
            jump(a){
            	console.log(a);
            	let _that =this;
            	_that.rows = a;
            	_that.show();
            },
             instance (type) {
                const title = '提示';
                const content = '<p>数据已添加</p>';
                const content2 = '<p>数据已删除</p>';
                const content3= '<p>数据已修改</p>';
                switch (type) {
                    case 'info':
                        this.$Modal.info({
                            title: title,
                            content: content3
                        });
                        break;
                    case 'success':
                        this.$Modal.success({
                            title: title,
                            content: content
                        });
                        break;
                    case 'warning':
                        this.$Modal.warning({
                            title: title,
                            content: content2
                        });
                        break;
                    case 'error':
                        this.$Modal.error({
                            title: title,
                            content: content
                        });
                        break;
                }
            }
        },
				mounted(){
					let _that =this;
					_that.loading () ;
					_that.show();
				}
    }
</script>
<style scoped="scoped" lang="less">

	.bb{
		color: red;
		.cc{
			color: green;
		}
	}
	.tables{
		
	}
</style>