<script>
import svgIcon from '../src/svg-icon.vue';

export default {
	components: {
		svgIcon,
	},
	data() {
		return {
			size: 100,
			color: '#ffc107',
			iconList: Object.keys(svgIcon.data().icons).sort(),
		};
	},
};
</script>

<template>
	<div class="demo">
		<h1>SVG Icons</h1>
		<p>Listed below are all the svg icons.
			Feel free to adjust the fields below to experiment with the size/color.</p>
		<fieldset>
			<label>size: <input type="number" v-model="size"/></label>
			<label>Color: <input type="text" v-model="color"/></label>
		</fieldset>
		<div class="icon-list">
			<div class="icon"
				v-for="icon in iconList"
				:key="icon">

				<svg-icon
					:name="icon"
					:size="size"
					:color="color"
				/><br/>
				<span>{{icon}}</span>
			</div>
		</div>
	</div>
</template>

<style scoped>
	fieldset {
		border: 0;
		outline: 0;
		text-align: center;
		margin-bottom: 25px;
	}
	.icon-list {
		display: flex;
		flex-wrap: wrap;
	}
	.icon {
		border: 1px solid #ccc;
		flex: 1 1 100px;
		text-align: center;
		font: 11px Arial, Helvetica, sans-serif;
		margin: 0 5px 10px;
	}
</style>
