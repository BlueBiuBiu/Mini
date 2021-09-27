<template>
	<div class="comment-list">
		<div style="padding-bottom: 30rpx;border-bottom: 2rpx solid rgb(233, 229, 229);" v-for="(item,index) in commentInfo" :key="item._id">
			<div class="user">
				<div class="avatar">
					<image v-if="item.avatar" class="aImg" :src="item.avatar" mode="" />
					<image v-else class="aImg" src="../../static/avatar.jpg" mode="" />
				</div>
				<div class="box">
					<div class="desc">
						<div style="color: rgb(87, 107, 149)">{{item.nickName || "修勾勾"}}</div>
						<div class="date">{{ item.createAt }}</div>
					</div>
					<div class="introduce">
						世界上只有一种真正的英雄主义，那就是看清生活的真相之后，依然热爱生活。
					</div>
				</div>
			</div>
			<div class="content">
				<div style="margin-bottom: 20rpx;">
					{{ item.content }}
				</div>
				<div class="imgArr">
					<div v-for="imgUrl in item.imgArr" :key="imgUrl">
						<image class="contentImg" :src="imgUrl" mode="aspectFill"></image>
					</div>
				</div>
				<div style="text-align: right;">
					<image class="replyImg" @click="toReply(index)" src="@/static/reply.jpg" mode=""></image>
				</div>
				<div>
					<block v-for="reply in item.replys">
						<div>
							<span>{{reply.userName}}</span>
							<span>{{reply.replyContent}}</span>
						</div>
					</block>
				</div>
				<div v-if="index === currentIndex" class="replyBox">
					<textarea class="reply" v-model="replyContent" placeholder="评论" maxlength="-1"></textarea>
					<button type="default" @click="sendReply(item)" size="mini" class="send">发送</button>
				</div>
			</div>
		</div>
		<button class="btn" type="primary" @click="showPopup">
			点击记录此刻你的心情吧
		</button>
		<van-popup class="popup" :show="show" @close="onClose" position="bottom">
			<textarea class="textarea" v-model="content" @input="fontNumChange" placeholder="写些什么记录一下吧~"
				maxlength="-1"></textarea>
			<div class="prev">
				<div style="position: relative;" v-for="(item, index) in uploadFiles" :key="item">
					<image class="addImg" :src="item" mode="aspectFill"></image>
					<van-icon class="icon" name="close" size="40rpx" @click="close(index)" />
				</div>
				<div>
					<image @click="uploadImg" class="addImg" src="../../static/addImg.png" />
				</div>
			</div>
			<button class="submit" type="default" @click="submit">立即发布</button>
		</van-popup>
		<van-notify id="van-notify" />
	</div>
</template>

<script>
	import dayjs from "dayjs";
	export default {
		name: "comment-list",
		data() {
			return {
				show: false,
				uploadFiles: [],
				realFilesUrl: [],
				content: "",
				commentInfo: [],
				userInfo: {},
				fontNum: 0,
				replyContent: "",
				currentIndex: -1
			};
		},
		created() {
			this.getComment();
		},
		methods: {
			showPopup() {
				const userInfo = uni.getStorageSync("userInfo")
				if (!userInfo) {
					uni.getUserProfile({
						lang: 'zh_CN',
						desc: '登录',
						success: (res) => {
							uni.setStorageSync("userInfo", res.userInfo)
						},
						fail: (res) => {
							console.log(res)
						}
					})
				}
				this.show = true;
			},
			onClose() {
				this.show = false;
			},
			uploadImg() {
				const count = 6 - this.uploadFiles.length;
				uni.chooseImage({
					count: count,
					success: async (res) => {
						if (res.tempFilePaths.length > 0) {
							let filePath = res.tempFilePaths[0];
							if (count > 0) {
								this.uploadFiles.push(filePath);
								const result = await uniCloud.uploadFile({
									filePath: filePath,
									cloudPath: "a.jpg",
								});
								if (result.success) {
									this.realFilesUrl.push(result.fileID);
								}
							}
						}
					},
				});
			},
			async submit() {
				if (!this.content) {
					this.$Message({
						type: "warning",
						message: "请输入内容再发表哦~",
					});
					return;
				}
				const userInfo = uni.getStorageSync("userInfo")
				const result = await this.$api.comment({
					avatar: userInfo.avatarUrl,
					nickName: userInfo.nickName,
					content: this.content,
					imgArr: this.realFilesUrl,
					createAt: dayjs().format("YYYY.MM.DD HH:mm:ss"),
				})
				uni.showLoading({
					title: "加载中",
				});
				if (result.id) {
					this.show = false;
					this.content = "";
					this.uploadFiles = [];
					this.realFilesUrl = [];
					this.getComment();
					uni.hideLoading();
				}
			},
			close(index) {
				this.uploadFiles.splice(index, 1);
				this.realFilesUrl.splice(index, 1);
			},
			async getComment() {
				uni.showLoading({
					title: "加载中",
				});
				const result = await this.$api.getComment()
				console.log(result);
				uni.hideLoading();
				this.commentInfo = result;
			},
			fontNumChange(e) {
				this.fontNum = e.detail.value.length
				console.log(this.fontNum)
			},
			toReply(index) {
				if (index === this.currentIndex) {
					this.currentIndex = -1
					return
				}
				this.currentIndex = index
			},
			async sendReply(item) {
				if (!this.replyContent) {
					this.$Message({
						type: "warning",
						message: "请输入评论内容~",
					});
					return;
				}
				uni.showLoading({
					title: "评论中",
				});
				const result = await this.$api.reply({
					article: item._id,
					userName: item.nickName,
					replyContent: this.replyContent,
				})
				if (result.id) {
					this.currentIndex = -1;
					this.replyContent = "";
					this.getComment();
					uni.hideLoading();
				}
			}
		},
	}
</script>

<style lang="less" scoped>
	.comment-list {
		width: 100%;
		margin-bottom: 60rpx;

		.user {
			display: flex;
			margin: 20rpx;
			padding: 10rpx;

			.avatar {
				margin-right: 20rpx;

				.aImg {
					width: 120rpx;
					height: 120rpx;
					border-radius: 50%;
				}
			}

			.desc {
				width: 100%;
				display: flex;
				margin-bottom: 20rpx;
				justify-content: space-between;

				.date {
					font-size: 26rpx;
					color: #999;
				}
			}

			.introduce {
				width: 100%;
				color: #999;
				display: -webkit-box;
				overflow: hidden;
				text-overflow: ellipsis;
				-webkit-line-clamp: 2;
				-webkit-box-orient: vertical;
				font-size: 28rpx;
			}
		}

		.replyBox {
			margin-top: 20rpx;
			background: rgb(247, 247, 247);
			padding: 16rpx;
			border-radius: 10rpx;
			box-sizing: border-box;
			position: relative;
		}

		.content {
			margin: 20rpx;
			margin-left: 170rpx;
			font-size: 28rpx;

			.imgArr {
				display: flex;
				flex-wrap: wrap;
			}

			.contentImg {
				width: 180rpx;
				height: 180rpx;
				margin-right: 6rpx;
				box-shadow: 0 0 2rpx #666;
			}

			.replyImg {
				width: 72rpx;
				height: 36rpx;
			}

			.reply {
				border: 2rpx solid green;
				padding: 6rpx 10rpx;
				border-radius: 8rpx;
				width: 520rpx;
				height: 120rpx;
				margin-right: 20rpx;
				background: #fff;
			}
			
			.send {
				position: absolute;
				bottom: 24rpx;
				right: 8rpx;
				z-index: 2;
			}
		}

		.btn {
			position: fixed;
			bottom: 0;
			left: 0;
			right: 0;
		}

		.popup {
			.textarea {
				margin: 40rpx auto;
				border: 2rpx solid #999;
				padding: 6rpx 10rpx;
			}

			.prev {
				display: flex;
				flex-wrap: wrap;
				width: 90%;
				margin: 0 auto;

				.icon {
					position: absolute;
					right: -20rpx;
					top: -20rpx;
					color: #fff;
					background: #f00;
					font-size: 20px;
					border-radius: 50%;
				}
			}

			.submit {
				background: #ff5777;
				width: 80%;
				margin: 0 auto;
				color: #fff;
			}

			.addImg {
				width: 200rpx;
				height: 200rpx;
				margin-left: 20rpx;
				margin-bottom: 16rpx;
			}
		}
	}
</style>
